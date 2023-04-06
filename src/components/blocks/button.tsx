import React, { useState, useEffect, useContext } from "react";
import { UndefinedLogic, useEloise } from "../../App";
import styled, { ThemeProps } from "styled-components";
import { Logic } from "../../functions";
import {
	ButtonProps,
	FirebaseButtonProps,
	RegularButtonProps,
	Theme,
} from "../../";

/**
 * A customizable button component that can be used for various purposes.
 * Supports regular buttons and buttons that interact with Firebase.
 *
 * @example_without_firebase
 * ```tsx
 * <Button 
 * onClick={() => console.log('Button clicked!')}
 * >Click me!</Button>
 * ```
 *
 * @example_with_firebase
 * 
 * ```tsx
 * <Button 
 *     firebase
 *     data={{ name: 'Eloise' }} 
 *     path="plans/id" // user is already handled
 *     next={afterPost}// function to call on sucessful post
 * >  Submit </Button>
 * ```
 */


const Button: React.FC<ButtonProps> = ({
	color = "primary",
	rounded = true,
	className,
	children,
	firebase = false,
	...props
}) => {
	const { theme, logic } = useEloise(); // Accesses the theme and logic from the app context using the useEloise hook

	// Handling firebase case
	if (firebase) {
		const { data, path, next } = props as FirebaseButtonProps;
		// Perform any required action with data and path

		const submit = async () => {
			let post = await logic.fb.setUserDoc(path, data); // Sends the data to Firebase to be stored
			if (post) {
				next(); // Runs the next function if post is successful
			}
		};

		// Renders the ButtonWrapper component with the appropriate props
		return (
			<ButtonWrapper
				logic={logic}
				backgroundColor={color}
				theme={theme}
				rounded={rounded}
				className={className}
				onClick={submit}
				aria-label={props["aria-label"]}
				role={props.role}
				tabIndex={props.tabIndex}>
				{children}
			</ButtonWrapper>
		);
	}

	const { onClick } = props as RegularButtonProps;

	// Renders the ButtonWrapper component with the appropriate props
	return (
		<ButtonWrapper
			logic={logic}
			backgroundColor={color}
			theme={theme}
			rounded={rounded}
			className={className}
			onClick={onClick}
			aria-label={props["aria-label"]}
			role={props.role}
			tabIndex={props.tabIndex}>
			{children}
		</ButtonWrapper>
	);
};

export { Button };

interface ButtonWrapperProps extends ThemeProps<Theme> {
	backgroundColor: string;
	rounded: boolean;
	logic: Logic | UndefinedLogic;
}

const ButtonWrapper = styled.button<ButtonWrapperProps>`
	width: 100%;
	background-color: ${(props) =>
		props.theme[
			props.backgroundColor
		]}; // Sets the background color to the passed color or default primary color
	color: white;
	border-radius: ${(props) =>
		props.rounded
			? `${props.theme.borderRadius}px`
			: "0"}; // Sets the border radius to the default radius in the theme or 0 if not rounded
	border: ${(props) =>
		props.theme
			.border}; // Sets the border style to the default border style in the theme
	padding: 0.75rem 1.5rem; // Sets the padding of the button
	transition: background-color 0.2s, transform 0.2s; // Adds a transition effect to the background color and transform

	// Hover state
	&:hover {
		background-color: ${(props) =>
			props.logic.color.lighten(
				props.theme[props.backgroundColor]
			)}; // Lightens the background color of the button
		transform: translateY(-3px); // Moves the button up by 3px
		cursor: pointer; // Sets the cursor to a pointer
	}

	// Active state
	&:active {
		background-color: ${(props) =>
			props.logic.color.darken(
				props.theme[props.backgroundColor]
			)}; // Darkens the background color of the button
		transform: translateY(0); // Resets the button to its original position
	}
`;