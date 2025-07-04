import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { mdiAlertCircle, mdiCheckCircle, mdiInformation } from "@mdi/js"
import Icon from "@mdi/react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-md px-4 py-3 text-md grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-0.5 items-center [&>svg]:size-4 [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground [&>svg]:text-card-foreground",
        primary: "bg-primary-bg [&>svg]:text-primary-500",
        danger: "bg-danger-bg [&>svg]:text-danger-500",
        warning: "bg-warning-bg [&>svg]:text-warning-500",
        success: "bg-success-bg [&>svg]:text-success-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const variantIcons = {
  default: mdiInformation,
  primary: mdiInformation,
  danger: mdiAlertCircle,
  warning: mdiAlertCircle,
  success: mdiCheckCircle,
}

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {variant && (
        <Icon path={variantIcons[variant]} size={1} className="text-current" />
      )}
      {props.children}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-md [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
