import {render, fireEvent, screen} from '@testing-library/react'
import { QuestionCard } from './QuestionCard'

test('Question appears on the card', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={5} totalQuestions={15}/>)
    expect(screen.getByText('"Testing a question"')).toBeInTheDocument;
})


test('Strongly Disagree button appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Strongly Disagree"})
    expect(btnElement).toBeInTheDocument
})

test('Can click on strongly disagree button', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Strongly Disagree"})
    expect(fireEvent.click(btnElement)).toBeTruthy
})

test('Neutral button appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Neutral"})
    expect(btnElement).toBeInTheDocument
})

test('Can click on neutral button', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Neutral"})
    expect(fireEvent.click(btnElement)).toBeTruthy
})

test('Agree button appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Agree"})
    expect(btnElement).toBeInTheDocument
})

test('Can click on agree button', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Agree"})
    expect(fireEvent.click(btnElement)).toBeTruthy
})

test('Strongly Agree button appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Strongly Agree"})
    expect(btnElement).toBeInTheDocument
})

test('Can click on strongly agree button', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const btnElement = screen.getByRole('button', {name: "Strongly Agree"})
    expect(fireEvent.click(btnElement)).toBeTruthy
})

test('Numerator of fraction appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    const numElements = screen.getAllByText("3")
    expect(numElements.length).toBe(2)
})

test('Denominator of fraction appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    expect(screen.getByText("/9")).toBeInTheDocument
})

test('Instructions appear', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    expect(screen.getByText("Please select how strongly you agree/disagree with this statement")).toBeInTheDocument
})

test('Quote appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    expect(screen.getByText("\"Don't worry about time, money, training, or education. Just think do you enjoy it?\"")).toBeInTheDocument
})

test('Jigna appears', async () => {
    render(<QuestionCard question={"Testing a question"} questionNumber={3} totalQuestions={9}/>)
    expect(screen.getByAltText('Jigna Small')).toBeInTheDocument
})
