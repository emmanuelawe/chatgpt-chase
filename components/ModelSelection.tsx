'use client'
import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/getEngines').then(res => res.json())

const ModelSelection = () => {
  const {data: models, isLoading} = useSWR('models', fetchModels)
  const {data: model, mutate: setModel} = useSWR('model', {
    fallbackData: 'text-davinci-003'
  })

  return (
    <div className='mt-2'>
      <Select 
      options={models?.modelOptions}
      className='mt-2'
      defaultValue={model}
      isSearchable
      isLoading={isLoading}
      menuPosition='fixed'
      classNames={{
        control: (state) => "bg-[#353540] border-[#353540]"
      }}
      placeholder={model}
      onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}

export default ModelSelection