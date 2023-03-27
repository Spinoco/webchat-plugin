import { PopoverBodyInterface } from "./popover-body-interface";
import { PopoverHeadInterface } from "./popover-head-interface";

export interface PopoverInterface {
    borderRadius?: string;
    head?: PopoverHeadInterface;
    body?: PopoverBodyInterface;
}
