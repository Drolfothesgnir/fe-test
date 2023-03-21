import type { ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

type Props = {
  name: string;
  total?: number;
  children: ReactNode;
  defaultExpanded?: boolean;
};

export default function FilterWrapper({
  name,
  total,
  children,
  defaultExpanded,
}: Props) {
  const theme = useTheme();
  return (
    <Accordion
      disableGutters
      TransitionProps={{ timeout: 0, unmountOnExit: true }}
      variant="elevation"
      square
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography color="primary.main" sx={{ width: "33%", flexShrink: 0 }}>
          {name}
        </Typography>
        {total ? (
          <Typography sx={{ color: "text.secondary", ml: 1 }}>
            {total}
          </Typography>
        ) : null}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
