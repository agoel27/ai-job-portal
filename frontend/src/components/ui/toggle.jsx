import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";
import { Plus, Check } from "lucide-react"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-left gap-2 rounded-3xl text-sm font-medium hover:bg-[#382D5E] hover:text-white disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[#382D5E] data-[state=on]:text-white [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-white border-[1px] border-[#382D5E]",
        // outline:
        //   "border border-input border-[#382D5E] bg-[#382D5E] shadow-xs hover:bg-[#382D5E] hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-[14vw] xl:min-w-[12vw] sm:min-w-[16vw] xs:min-w-[20vw]",
        sm: "h-8 px-1.5 min-w-[15vw]",
        lg: "h-10 px-2.5 min-w-[6vw]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  const [on, off] = React.useState(false);

  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      pressed={on}
      onPressedChange={off}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}>
      {on ? (
        <Check className="size-4" />
      ) : (
        <Plus className="size-4" />
      )}
      {props.children}
    </TogglePrimitive.Root>
  );
}

export { Toggle, toggleVariants }
