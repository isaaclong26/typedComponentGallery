import React, { useState, useEffect, useContext } from "react";
import { UndefinedLogic, useEloise } from "../../App";
import styled, { ThemeProps } from "styled-components";
import { Logic } from "../../functions";
import {
	EloiseWidget,
	HSLAColor,
	Theme,
} from "../../";

 //button 
 /**
  * BaseButtonProps is an interface that extends React.ButtonHTMLAttributes<HTMLButtonElement>.
  * It contains additional properties to customize the button component.
  */
 export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   color?: "primary" | "secondary" | "accent" | "clear" |"grey"| HSLAColor; // Defines the color of the button
   rounded?: boolean; // Determines if the button should have rounded corners
   className?: string; // Allows for custom styling via class names
   children?: React.ReactNode; // The content of the button
   role?: string; // Sets the role attribute of the button
   ariaLabel?: string; // Sets the aria-label attribute of the button
   ariaPressed?: boolean; // Sets the aria-pressed attribute of the button
   ariaExpanded?: boolean; // Sets the aria-expanded attribute of the button
   ariaControls?: string; // Sets the aria-controls attribute of the button
   ariaDescribedBy?: string; // Sets the aria-describedby attribute of the button
   tabIndex?: number; // Sets the tab index of the button
   purpose?: string; // Tells Eloise the Purpose of the Button;
 }
 
 /**
  * RegularButtonProps is an interface that extends BaseButtonProps and adds the onClick event handler.
  * It is used for regular buttons that do not interact with Firebase.
  */
 export interface RegularButtonProps extends BaseButtonProps {
   firebase?: false; // Indicates that this is not a Firebase button
   onClick?: () => void; // The onClick event handler for the button
 }
 
 /**
  * FirebaseButtonProps is an interface that extends BaseButtonProps and adds additional properties required for Firebase buttons.
  * It is used for buttons that interact with Firebase.
  */
 export interface FirebaseButtonProps extends BaseButtonProps {
   firebase: true; // Indicates that this is a Firebase button
   data: any; // The data to be stored in Firebase
   path: string; // The path in Firebase where the data should be stored
   next: Function; // A function to be called after the data has been successfully stored in Firebase
 }
 
 /**
  * ButtonProps is a union type that can either be RegularButtonProps or FirebaseButtonProps.
  * It is used to define the props of the Button component.
  */
 export type ButtonProps = RegularButtonProps | FirebaseButtonProps;
 
 
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
	purpose,
	...props
}) => {
	const { theme, logic } = useEloise(); // Accesses the theme and logic from the app context using the useEloise hook

	// Handling firebase case
	if (firebase) {
		const { data, path, next } = props as FirebaseButtonProps;
		// Perform any required action with data and path

		const submit = async () => {
			let post = await logic.fb.docs.setUserDoc(path, data); // Sends the data to Firebase to be stored
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
		<EloiseWidget eloiseIntel={{purpose}}>
		<ButtonWrapper
			logic={logic}
			backgroundColor={color}
			theme={theme}
			rounded={rounded}
			className={className}
			onClick={onClick}
			aria-label={props["aria-label"]}
			role={props.role}
			tabIndex={props.tabIndex}
			style={props.style}>
			{children}
		</ButtonWrapper>
		</EloiseWidget>
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
			? `3px`
			: "0"}; // Sets the border radius to the default radius in the theme or 0 if not rounded
	border: ${(props) =>
		props.theme
			.border}; // Sets the border style to the default border style in the theme
	padding: 0.75rem 1.5rem; // Sets the padding of the button
	transition: background-color 0.2s, transform 0.2s; // Adds a transition effect to the background color and transform

	// Hover state
	&:hover {
		background-color: ${(props) =>
			props.backgroundColor=== "clear"? "transparent" :
			props.logic.color.lighten(
				props.theme[props.backgroundColor]
			)}; // Lightens the background color of the button
		transform: translateY(-3px); // Moves the button up by 3px
		cursor: pointer; // Sets the cursor to a pointer
	}

	// Active state
	&:active {
		background-color: ${(props) =>
			props.backgroundColor=== "clear"? "transparent" :

			props.logic.color.darken(
				props.theme[props.backgroundColor]
			)}; // Darkens the background color of the button
		transform: translateY(0); // Resets the button to its original position
	}
`;