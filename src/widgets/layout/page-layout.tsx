import {AppShell} from "@mantine/core";
import {PropsWithChildren} from "react";
import {NavbarOwn} from "~/features/navbar";

export const PageLayout: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <AppShell navbar={<NavbarOwn/>} layout='alt'>
            {children}
        </AppShell>
    );

}