export interface PlainObject {
  [key: string]: number | string | boolean
}

export interface DirectiveBinding {
  name: string;
  value: any;
  oldValue: any;
  expression: string;
  arg: any;
  modifiers: Record<string, boolean>;
}

