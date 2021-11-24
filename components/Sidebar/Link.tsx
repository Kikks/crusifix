import { ReactNode } from "react";
import Link from "next/link";
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from "@mui/material";

type SidebarItemProps = {
	icon: ReactNode;
	name: string;
	href: string;
};

const Item = ({ icon, name, href }: SidebarItemProps) => {
	return (
		<Link href={href} passHref>
			<ListItem disablePadding>
				<ListItemButton sx={{ justifyContent: "center" }}>
					<ListItemIcon sx={{ color: "#5a7184" }}>{icon}</ListItemIcon>
					<ListItemText
						sx={{
							"& span": {
								fontWeight: "600 !important"
							}
						}}
						primary={name}
					/>
				</ListItemButton>
			</ListItem>
		</Link>
	);
};

export default Item;
