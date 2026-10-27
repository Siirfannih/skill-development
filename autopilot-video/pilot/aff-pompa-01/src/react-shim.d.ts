declare namespace React {
  type ReactNode = unknown;
  type PropsWithChildren<P = unknown> = P & {children?: ReactNode};
  interface FC<P = Record<string, never>> {
    (props: P): unknown;
  }
}

declare module 'react' {
  export = React;
}

declare module 'react/jsx-runtime' {
  export const Fragment: unknown;
  export const jsx: unknown;
  export const jsxs: unknown;
}

declare namespace JSX {
  interface ElementChildrenAttribute {
    children: unknown;
  }
  interface IntrinsicElements {
    [elementName: string]: unknown;
  }
}
