import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { CopyrightProps } from '../../interfaces';

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/fabioo798">
        FabioDN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
