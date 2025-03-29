import { useEffect, useState } from 'react';
import style from './Contact.module.css';

export default function Contact() {
  const [values, setValues] = useState({
    name:'',
    email:'',
    content:'',
  })
  const [errors, setErrors] = useState({
    name:false,
    email:false,
    content:false,
  })
  const [readonlyBool, setReadonlyBool] = useState(false)
  
  const onSubmit = (e) => {
    e.preventDefault();

    if(!values.name) {
      setErrors(errors => ({
        ...errors,
        name: 'お名前は必須です。',
      }))
    } else if (values.name.length >= 30) {
      setErrors(errors => ({
        ...errors,
        name: 'お名前は30文字以内で入力してください。',
      }))
    } else {
      setErrors(errors => ({
        ...errors,
        name: true,
      }))
    }
    
    if(!values.email) {
      setErrors(errors => ({
        ...errors,
        email: 'メールアドレスは必須です。',
      }))
    } else {
      setErrors(errors => ({
        ...errors,
        email: true,
      }))
    }

    if(!values.content) {
      setErrors(errors => ({
        ...errors,
        content: '本文は必須です。',
      }))
    } else if (values.content.length >= 500) {
      setErrors(errors => ({
        ...errors,
        content: '本文は500文字以内で入力してください。',
      }))
    } else {
      setErrors(errors => ({
        ...errors,
        content: true,
      }))
    }

  }

    useEffect(() => {
    const formValues = Object.values(errors)
      const check = formValues.every(value => value === true)
      if(check) {
        postData()
      }
    }, [errors])

    const postData = async() => {
      try {
        setReadonlyBool(prev => prev = true)
        const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts'
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({values})
        })
        
        if(!response.ok) {
          throw new Error('データを送信できませんでした。')
        }

        alert('送信しました')
        valueClear()
        setReadonlyBool(prev => prev = false)

      } catch(e) {
        console.error(e, '予期せぬエラーです。')
      }
    }

    const valueClear = () => {
      setValues(prev => ({
        ...prev,
        name: '',
        email: '',
        content: ''
      }))
    }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-black text-xl font-bold">問合わせフォーム</h1>
      <form onSubmit={onSubmit} action="" className="mt-10">
        <div className="flex items-center">
          <label htmlFor="name" className="font-medium w-56">お名前</label>
          <div className='grow'>
            <input 
              id="name"
              name='name'
              className="w-full border border-gray-300 border-solid rounded-md p-2"
              type='text'
              value={values.name}
              onChange={(e) => setValues(prev => ({...prev, name:e.target.value}))}
              readOnly={readonlyBool}
            />
            <p className='text-red-800'>{errors.name}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <label htmlFor="email" className="font-medium w-56">メールアドレス</label>
          <div className='grow'>
            <input 
              id="email"
              name='email'
              className="w-full border border-gray-300 border-solid rounded-md p-2"
              type='email'
              value={values.email}
              onChange={(e) => setValues(prev => ({...prev, email:e.target.value}))}
              readOnly={readonlyBool}
            />
            <p className='text-red-800'>{errors.email}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <label htmlFor="content" className="font-medium w-56">本文</label>
          <div className='grow'>
            <textarea 
              id="content"
              name='content'
              className="h-48 w-full border border-gray-300 border-solid rounded-md p-2"
              value={values.content}
              onChange={(e) => setValues(prev => ({...prev, content:e.target.value}))}
              readOnly={readonlyBool}
            ></textarea>
            <p className='text-red-800'>{errors.content}</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center gap-8">
          <button className={style.buttonBlack}>送信</button>
          <button type="button" onClick={valueClear}>クリア</button>
        </div>
      </form>
    </div>
  )
}