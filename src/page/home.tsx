import { ChangeEvent, useState } from 'react'

export const Home = () => {
  const [error, setError] = useState<string>()
  const [decimal, setDecimal] = useState<string>('...')

  const handleChange = async (_event: ChangeEvent<HTMLInputElement>) => {
    _event.preventDefault()
    const message: string = _event.target.value
    let hasError: Array<boolean> = []
    setDecimal('...')

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

    setDecimal(_decimal.toString())
  }

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center gap-6 p-4'>
      <h1 className='text-4xl text-center font-black'><span className='text-violet-500 opacity-40'>000</span>Bin2Dec<span className='opacity-40 text-violet-500'>000</span></h1>

      <div className=' flex-col flex items-center justify-center gap-4'>
        <p className='text-sm text-center text-zinc-300'>
          Enter a&nbsp;
          <a
            href='https://en.wikipedia.org/wiki/Binary_number'
            target='_blank'
            className='bg-violet-500 bg-opacity-20 transition-all hover:underline '>
            binary number
          </a>
          &nbsp;to convert by&nbsp;
          <a
            href='https://en.wikipedia.org/wiki/Decimal'
            target='_blank'
            className='bg-violet-500 bg-opacity-20 transition-all hover:underline'>
            decimal number
          </a>.
        </p>

        <input
          type="text"
          maxLength={8}
          onChange={event => handleChange(event)}
          className='bg-transparent border-2 border-opacity-20 border-violet-500 outline-0 p-3 text-center text-sm w-full focus:bg-opacity-20 focus:bg-violet-500 ' />
        {error && (
          <span className='text-red-500 text-sm'>OPS! {error}</span>
        )}
        {decimal && (
          <span className='font-black text-violet-100 text-3xl'>{decimal}</span>
        )}
      </div>
    </main>
  )

}
