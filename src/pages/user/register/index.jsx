import React from 'react'
import FormRegister from '../../../components/formRegister'

const Register = () => {
  return (
    <div className="w-full min-h-screen bg-normal-bg-color flex flex-row-reverse items-center justify-center px-4">
      {/* form login */}
      <div className="w-1/2 ml-12">
        <FormRegister />
      </div>
      <div className="w-1/2 mr-4">
        <div className="bg-topzone-image bg-no-repeat bg-contain min-h-[190px] bg-right"></div>
      </div>
    </div>
  )
}

export default Register