import { ChangeEvent, useState } from 'react'

export const Home = () => {
  const [error, setError] = useState<string>()
  const [decimal, setDecimal] = useState<number>()

  const handleChange = async (_event: ChangeEvent<HTMLInputElement>) => {
    _event.preventDefault()
    const message: string = _event.target.value
    let hasError: Array<boolean> = []
    setDecimal(undefined)

    hasError = await Promise.all(message
      .split('')
      .map((_letter: string) => {
        const number = parseInt(_letter, 10)

        if (isNaN(number)) setError('You entered a non-number digit')
        else if (number !== 0 && number !== 1) setError('You entered a non-binary digit')
        else return false

        return true
      })
      .filter((_error: boolean) => _error === true)
    )

    if (hasError.length === 0) setError(undefined)
    if (hasError.length === 0 && message.length > 0) convertToBinary(message)
  }

  const convertToBinary = (_message: string) => {
    const _decimal = _message
      .split('')
      .reverse()
      .map((_letter: string) => parseInt(_letter))
      .map((_number: number, _index: number) => Math.pow(2, (_index)) * _number)
      .reduce((_binary: number, _decimal: number) => _binary + _decimal)

    setDecimal(_decimal)
  }

  return (
    <>
      <label htmlFor="binary">Enter a <span>binary number</span> to convert by <span>decimal number</span>.</label>
      <input id="binary" type="text" maxLength={8} onChange={event => handleChange(event)} />
      {error && (<span>{error}</span>)}
      {decimal && (<span>{decimal}</span>)}
    </>
  )

}
