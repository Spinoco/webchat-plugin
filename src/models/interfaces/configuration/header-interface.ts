import { HeaderCloseIconInterface } from "./header-close-icon-interface";
import { HeaderLogoInterface } from "./header-logo-interface";
import { HeaderTitleInterface } from "./header-title-interface";

export interface HeaderInterface {
    padding?: string;
    backgroundColor?: string;
    borderBottom?: string;
    logo?: HeaderLogoInterface;
    title?: HeaderTitleInterface;
    closeIcon: HeaderCloseIconInterface;
}
