export type AllPropertiesOptional<T> = {
  [P in keyof T]?: T[P];
};