import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

 function ToolTipComponent({toolTipPlaceHolder,toolTipContent}: {toolTipPlaceHolder: string,toolTipContent: string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" className="hover:border-black border-[1px]">{toolTipPlaceHolder}</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
          <p>{toolTipContent}y</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default ToolTipComponent;
