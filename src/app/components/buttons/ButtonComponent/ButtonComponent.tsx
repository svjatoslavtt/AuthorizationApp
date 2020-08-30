import Button from '@material-ui/core/Button';
import React from 'react';

import { ButtonColorsEnum, ButtonTypesEnum } from '../buttonComponentEnum';

import styles from './ButtonComponent.module.scss';

interface ButtonUIProps {
	onClick?: any;
	color: ButtonColorsEnum | undefined;
	text: string;
	type?: ButtonTypesEnum | undefined;
	disabled?: boolean;
	center?: boolean;
}

const ButtonComponent: React.FC<ButtonUIProps> = ({
	onClick,
	center,
	color,
	text,
	type,
	disabled,
	...otherProps
}) => {
	return (
		<div
			className={`${center ? styles.wrapperButton : undefined} ${
				styles.Button
			}`}
		>
			<Button
				onClick={onClick}
				variant='contained'
				color={color || ButtonColorsEnum.primary}
				type={type || ButtonTypesEnum.button}
				disabled={disabled}
				{...otherProps}
			>
				{text}
			</Button>
		</div>
	);
};

export default ButtonComponent;
