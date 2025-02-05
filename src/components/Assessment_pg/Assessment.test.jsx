import {render, fireEvent, screen} from '@testing-library/react'
import Assessment_pg from './Assessment_pg'

test('Assessment page rendered', async () => {
    render(<Assessment_pg />)
  
    //Card title and subtitle
    screen.getByText('Let us show how your interests connect different career fields!')
    screen.getByText('Take this quiz to get ideads and inspiration for your career path.')

    // Click button
    fireEvent.click(screen.getByText('Quick Quiz'))
    
    // Wait for page to update with query text
    // const items = await screen.findAllByText(/Item #[0-9]: /)
    // expect(items).toHaveLength(10)
  })