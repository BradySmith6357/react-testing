import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from "./App";

test('button has correct initial color', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});

  expect(colorButton).toHaveStyle({ backgroundColor: 'red'});

});


test('button turns blue when clicked', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});

  //click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle( {backgroundColor: 'blue'});

  // expect the button text to read 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
});

test('button starts enabled and checkbox is unchecked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name : 'Change to blue' });

  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})

test('checkbox disables and enables button', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name : 'Change to blue'});
  const checkbox = screen.getByRole('checkbox', { name : 'Disable button'});

// disable button, check that it is disabled and gray
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();
  expect(colorButton).toHaveStyle({backgroundColor:'gray'});

// enable button, check that it is enabled and red
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});

})

test("click button to change color then disable button then enable button", () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name : 'Change to blue'});
  const checkbox = screen.getByRole('checkbox', { name : 'Disable button'});

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor:'blue'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor:'gray'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor:'blue'});
})

describe('spaces before camel case letters', () => {

  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})