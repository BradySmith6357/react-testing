import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();

})