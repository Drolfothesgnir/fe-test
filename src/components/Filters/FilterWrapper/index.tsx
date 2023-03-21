import type {ReactNode} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  name: string;
  total?: number;
  children: ReactNode;
}

export default function FilterWrapper({name, total, children}: Props) {
  return (
    <Accordion disableGutters TransitionProps={{timeout: 0, unmountOnExit: true}} variant="elevation" square>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {name}
          </Typography>
          {total ? (
            <Typography sx={{color: 'text.secondary'}}>
            {total}
          </Typography>
          ) : null}
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
    </Accordion>
  )
}