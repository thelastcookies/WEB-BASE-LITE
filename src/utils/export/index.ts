import { Document, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, WidthType } from 'docx';
import type { WorkSheet } from 'xlsx';
import { utils, writeFileXLSX } from 'xlsx';
import type { jsPDFOptions } from 'jspdf';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

/**
 * exportJsonAsXlsx: 以 JSON 为数据源导出为 Excel
 * @param data JSON 数组
 * @param header 导出 Excel 的表头
 * @param fileName 导出 Excel 的文件名，默认为 "导出"
 */
export const exportJsonAsXlsx = (
  data: any[],
  header = [],
  fileName = '导出',
) => {
  try {
    const ws = utils.json_to_sheet(data, { header });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, '');
    writeFileXLSX(wb, `${fileName}.xlsx`);
  } catch (e) {
    message.error('导出失败');
    console.error(e);
  }
};

/**
 * exportDomAsXlsx: 以 TABLE DOM 为数据源导出为 Excel
 * @param dom 所要导出的 DOM
 * @param fileName 导出的 Excel 文件名，默认为 "导出"
 */
export const exportTableAsXlsx = (
  dom: HTMLTableElement,
  fileName = '导出',
) => {
  try {
    // const dom = document.getElementById(domId)!;
    let ws: WorkSheet;
    if (dom.tagName === 'TABLE') {
      // 如果 domId 指向的 DOM 本身即为 Table，则导出此 Table
      ws = utils.table_to_sheet(dom);
    } else {
      // 如果 domId 指向 Table 的容器，则在其中寻找 Table
      let domList = dom.getElementsByTagName('TABLE');
      if (domList.length === 0) {
        console.info(`export.exportTableAsXlsx: TABLE DOM not found.`);
        return;
      }
      ws = utils.table_to_sheet(domList[0]);
      // 如果 Table 不止一个，则将其拼接起来一起导出
      if (domList.length > 1) {
        for (let i = 1, len = domList.length; i < len; i++) {
          utils.sheet_add_dom(ws, domList[i], { origin: -1 });
        }
      }
    }

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, '');
    writeFileXLSX(wb, `${fileName}.xlsx`);
  } catch (e) {
    message.error('导出失败');
    console.error(e);
  }
};

/**
 * domToTableObject: 将 Table DOM 组织成为 docx 可用的 Table 格式数据
 * @param dom 传入的 dom
 */
const domToTableObject = (dom: HTMLTableElement) => {
  try {
    let rows = [] as TableRow[];
    let trDom = dom.getElementsByTagName('TR');
    // 'docx' 要求使用 Table 构造函数时，rows 至少要有一条，因此不满足条件时即跳出
    if (trDom.length === 0) return;
    for (let i = 0, len = trDom.length; i < len; i++) {
      let tcDom: HTMLCollectionOf<Element>;
      if (trDom[i].getElementsByTagName('TH').length) {
        tcDom = trDom[i].getElementsByTagName('TH');
      } else if (trDom[i].getElementsByTagName('TD').length) {
        tcDom = trDom[i].getElementsByTagName('TD');
      } else return;
      let cells = [] as TableCell[];
      for (let j = 0, lenTd = tcDom.length; j < lenTd; j++) {
        cells.push(
          new TableCell({
            children: [new Paragraph((tcDom[j] as HTMLTableCellElement).innerText)],
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            verticalAlign: VerticalAlign.CENTER,
            rowSpan: (tcDom[j] as HTMLTableCellElement).rowSpan,
            columnSpan: (tcDom[j] as HTMLTableCellElement).colSpan,
          }),
        );
      }
      rows.push(new TableRow({
          children: cells,
        }),
      );
    }
    return new Table({
      rows,
    });
  } catch (e) {
    message.error('导出失败');
    console.error(e);
  }
};

/**
 * exportTableAsDocx: 以 TABLE DOM 为数据源导出为 Docx
 * 针对 Element Plus Table 组件优化
 * @param dom 所要导出的 DOM
 * @param fileName 导出的 Excel 文件名，默认为 "导出"
 */
export const exportTableAsDocx = (
  dom: HTMLTableElement,
  fileName = '导出',
) => {
  try {
    // const dom = document.getElementById(domId)!;
    let table;
    let sections = [];
    if (dom.tagName === 'TABLE') {
      // 如果 domId 指向的 DOM 本身即为 Table，则导出此 Table
      table = domToTableObject(dom as HTMLTableElement);
      if (table instanceof Table) {
        sections.push(table);
      } else {
        console.error(`export.exportTableAsDocx: Failed to parse TABLE DOM`);
        return;
      }
    } else {
      // 如果 domId 指向 Table 的容器，则在其中寻找 Table，并将其拼接并一起导出
      let domList = dom.getElementsByTagName('TABLE');
      for (let i = 0, len = domList.length; i < len; i++) {
        table = domToTableObject(domList[i] as HTMLTableElement);
        if (table instanceof Table) {
          sections.push(table);
        } else {
          console.error(`export.exportTableAsDocx: Failed to parse TABLE DOM`);
          return;
        }
      }
    }

    const doc = new Document({
      sections: [
        {
          children: sections,
        },
      ],
    });

    try {
      Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, `${fileName}.docx`);
      });
    } catch (e) {
      console.error(`export.exportTableAsDocx: Failed to save blob as docx file`);
    }
  } catch (e) {
    message.error('导出失败');
    console.error(e);
  }
};

/**
 * exportDocxWithTemplate: 以 .docx 为模板导出
 * npm install --save docxtemplater pizzip
 */
// export const exportDocxWithTemplate = () => {
//
// };

/**
 * pdfOverview: 浏览器端的 PDF Reader
 * mozilla/pdf.js
 */
// export const pdfOverview = () => {
//
// };

interface jsPDFExdOptions extends jsPDFOptions {
  A4Padding?: number;
}

/**
 * jsPDFExd: 对 jsPDF 的扩展
 */
class jsPDFExd extends jsPDF {
  private readonly A4PageWidth: number;
  private readonly A4PageHeight: number;
  private readonly A4Padding: number;
  // 所有图片的累加高度记录
  private heightAcc: number;

  constructor(options?: jsPDFExdOptions) {
    super(options);
    this.A4PageWidth = 595.28;
    this.A4PageHeight = 841.89;
    this.A4Padding = options?.A4Padding || 20;
    this.heightAcc = this.A4Padding;
  }

  addCanvasToPage = (canvas: HTMLCanvasElement): void => {
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let imgWidth = this.A4PageWidth - this.A4Padding * 2;
    let imgHeight = imgWidth / canvasWidth * canvasHeight;
    let img = canvas.toDataURL('image/jpeg', 1.0);
    // 转到最后一页下继续添加图片，考虑的是在之前的图片添加中出现了跨页的情况
    this.setPage(this.getNumberOfPages());
    // 使用图片的累加高度对 A4 高度取余，可以得到图片在最后一页中距离顶部的偏移量，以此作为新图片添加的开始坐标
    let offsetTop = this.heightAcc % this.A4PageHeight;
    if (imgHeight < this.A4PageHeight) {
      // 图片在 pdf 中的高度 < A4 纸的高度，因此在当前页下添加图片
      this.addImage(img, 'JPEG', this.A4Padding, offsetTop, imgWidth, imgHeight);
      // 如果当前图片刚好跨页
      if ((imgHeight + offsetTop) > this.A4PageHeight) {
        // 在新建的页面中添加图片的超出部分
        this.addPage();
        offsetTop -= this.A4PageHeight;
        this.addImage(img, 'JPEG', this.A4Padding, offsetTop, imgWidth, imgHeight);
      }
    } else {
      // 图片的高度 > A4 纸的高度, 通过调整距离顶部偏移量来实现图片的切割
      let imgHeightT = imgHeight;
      while (imgHeightT > 0) {
        this.addImage(img, 'JPEG', this.A4Padding, offsetTop, imgWidth, imgHeight);
        imgHeightT -= this.A4PageHeight;
        if (imgHeightT > 0) {
          offsetTop -= this.A4PageHeight;
          this.addPage();
        }
      }
    }
    this.heightAcc += imgHeight;
  };
}


/**
 * exportAsPdf: 以 TABLE DOM 为数据源导出为 PDF
 * @param dom 所要导出的 DOM
 * @param fileName 导出的 Excel 文件名，默认为 "导出"
 */
export const exportTableAsPdf = async (
  dom: HTMLTableElement,
  fileName = '导出',
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // let dom = document.getElementById(domId)!;
      if (!dom) {
        // console.error(`export.exportAsPdf: Invalid DOM #${domId}`);
      }
      let PDF = new jsPDFExd({
        orientation: 'p',
        unit: 'pt',
        format: 'a4',
      });
      if (dom.tagName === 'TABLE') {
        // 如果 domId 指向的 DOM 本身即为 Table，则导出此 Table
        let canvas = await html2canvas(dom as HTMLElement);
        PDF.addCanvasToPage(canvas);
      } else {
        // 如果 domId 指向 Table 的容器，则在其中寻找 Table
        let domList = dom.getElementsByTagName('TABLE');
        for (let i = 0, len = domList.length; i < len; i++) {
          let canvas = await html2canvas(domList[i] as HTMLElement);
          PDF.addCanvasToPage(canvas);
        }
      }
      PDF.save(fileName + '.pdf');
      resolve();
    } catch (e) {
      message.error('导出失败');
      console.error(e);
      reject();
    }
  });

};


// export const exportAsPdf1 = (
//   domId: string,
//   fileName = '导出',
// ) => {
// let element = document.getElementById(domId);
// html2pdf(element);
// };
