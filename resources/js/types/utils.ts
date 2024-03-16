type TailwindPalette =
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "zinc";

export type ColorInfo = {
    hex: string;
    rgb: string;
    textClass: string;
    bgClass: string;
    semanticName: string;
    tailwindPalette: TailwindPalette;
};
