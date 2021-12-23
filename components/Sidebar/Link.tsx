import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
	onClick: () => void;
};

const Item = ({ icon, name, href, onClick }: SidebarItemProps) => {
	const { pathname } = useRouter();
	const linkIsActive = pathname.split("/")[3] === href.split("/")[3];

	return (
		<Link href={href} passHref>
			<ListItem disablePadding>
				<ListItemButton sx={{ justifyContent: "center" }} onClick={onClick}>
					<ListItemIcon
						sx={{ color: linkIsActive ? "secondary.main" : "#5a7184" }}
					>
						{icon}
					</ListItemIcon>
					<ListItemText
						sx={{
							"& span": {
								fontWeight: "600 !important",
								color: linkIsActive ? "secondary.main" : "#5a7184"
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
