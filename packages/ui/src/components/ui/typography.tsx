import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const typographyVariants = cva("text-black dark:text-white", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      p: "leading-7",
      blockquote: "italic",
      code: "font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "h4",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant = "h4", ...props }: TypographyProps, ref) => {
    // eslint-disable-next-line
    let Comp: any;
    if (
      variant === "muted" ||
      variant === "large" ||
      variant === "lead" ||
      variant === "blockquote"
    ) {
      Comp = "p";
    } else {
      Comp = variant;
    }
    return (
      <Comp
        data-variant={variant}
        ref={ref}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export default Typography;
