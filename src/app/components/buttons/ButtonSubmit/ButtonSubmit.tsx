import React from 'react';

import { Button } from '@material-ui/core';

interface ButtonSubmitProps {
	disabled: boolean;
	text: string;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ disabled, text }) => (
	<div>
		<Button
			disabled={disabled}
			variant="contained"
			color="primary"
			type="submit"
		>
			{text}
		</Button>
	</div>
);

export default ButtonSubmit;
