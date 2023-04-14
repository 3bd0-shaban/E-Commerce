import AppointmentsList from '@app/patient/(components)/AppointmentsList'
import Contact from '@app/patient/(components)/Contact'
import PaymentsList from '@app/patient/(components)/PaymentsList'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (

        <div className='space-y-5'>
            <h3 className='text-lg font-medium'>Introduction</h3>
            <p className='text-gray-400 leading-loose'>
                {`Web designers to occupy the space which will later be filled with 'real' content. This is required when,
                for example, the final text is not yet available. Dummy text is also known as 'fill text'.
                Dummy texts have been in use by typesetters since the 16th century.`}
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <AppointmentsList />
                <PaymentsList />
            </div>
            <Contact />
        </div>
    )
}

export default page