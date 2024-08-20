import * as React from "react"

import { cn } from "@/lib/utils"

// eslint-disable-next-line react/prop-types
const TextArea = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        (<textarea
            type={type}
            rows={10}
            className={cn(
                "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props} />)
    );
})
TextArea.displayName = "Textarea"

export { TextArea }
