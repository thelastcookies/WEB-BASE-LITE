import type { Key } from '@/types';
import type { TreeNodeInterface } from '@/utils/tree/types';

export class TreeNode<T extends TreeNodeInterface = TreeNodeInterface> implements TreeNodeInterface {
  [key: string]: any;

  constructor(
    data: Partial<TreeNodeInterface> = {},
    handler?: <T extends TreeNodeInterface>(arg: TreeNodeInterface) => T,
  ) {
    if (handler) data = handler(data);
    Object.assign(this, data);
  }

  getId(): Key | undefined {
    return this.id ?? this.Id ?? this.key ?? this.Key;
  }

  setId(v: Key) {
    if ('id' in this) {
      this.id = v;
    } else if ('Id' in this) {
      this.Id = v;
    } else if ('key' in this) {
      this.key = v;
    } else if ('Key' in this) {
      this.Key = v;
    } else {
      this.id = v;
    }
  }

  getParentId(): Key | undefined {
    return this.pid ?? this.PId ?? this.pId ?? this.parentId ?? this.ParentId;
  }

  setParentId(v: Key): void {
    if ('pid' in this) {
      this.pid = v;
    } else if ('pId' in this) {
      this.pId = v;
    } else if ('PId' in this) {
      this.PId = v;
    } else if ('parentId' in this) {
      this.parentId = v;
    } else if ('ParentId' in this) {
      this.ParentId = v;
    } else {
      this.pid = v;
    }
  }

  getLabel(): string | undefined {
    return this.name ?? this.label ?? this.title ?? this.value ?? this.Name;
  }

  setLabel(v: string): void {
    if ('name' in this) {
      this.name = v;
    } else if ('label' in this) {
      this.label = v;
    } else if ('title' in this) {
      this.title = v;
    } else if ('value' in this) {
      this.value = v;
    } else if ('Name' in this) {
      this.Name = v;
    } else {
      this.name = v;
    }
  }

  getOrder(): Key | undefined {
    return this.sort ?? this.Sort ?? this.order ?? this.Order;
  }

  setOrder(v: Key): void {
    if ('sort' in this) {
      this.sort = v;
    } else if ('Sort' in this) {
      this.Sort = v;
    } else if ('order' in this) {
      this.order = v;
    } else if ('Order' in this) {
      this.Order = v;
    } else {
      this.sort = v;
    }
  }

  getChildren(): TreeNode<T>[] | undefined {
    return this.children ?? this.Children;
  }

  setChildren(v: TreeNode<T>[]): void {
    if ('children' in this) {
      this.children = v;
    } else if ('Children' in this) {
      this.Children = v;
    } else {
      this.children = v;
    }
  }

  isRoot(): boolean {
    return [null, 'root', 'ROOT'].includes(this.getParentId() as string);
  }
}
