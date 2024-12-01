import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineSetting } from 'react-icons/ai';
import Modal from '../Modal';
import CreateCustomPrompt from './CreateCustomPrompt';
import { deleteCustomPrompt, getCustomPrompts } from '@/pages/settings/core/_requests';
import { CustomPrompt } from '@/pages/settings/core/_models';
import moment from 'moment';
import Shimmer from '../Shimmer';
import ModalDelete from '../ModalDelete';

export default function CustomPromptSetting() {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [customPrompts, setCustomPrompts] = useState<Array<CustomPrompt>>(); // Loading state
  const [deleteCustomPromptData, setDeleteCustomPromptData] = useState<CustomPrompt>(); // Loading state
  const [editCustomPromptData, setEditCustomPromptData] = useState<CustomPrompt>(); // Loading state

  const getCustomPrompt = () => {
    setIsLoading(true);
    getCustomPrompts().then((data) => {
      var result = data.result
      setCustomPrompts(result)
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteCustomPrompt = (guid: string) => {
    setIsLoading(true);
    deleteCustomPrompt(guid).then((data) => {
      setDeleteCustomPromptData(undefined)
      getCustomPrompt();
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCustomPrompt();
  }, []);

  return (
    <div className="bg-gray-700 text-white min-h-screen w-full">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Custom Prompt</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded">
            + Create
          </button>
        </div>

        {/* Project Table */}
        <div className="bg-gray-800 rounded-lg">
          {/* Table Header */}

          {isLoading && <Shimmer className="w-full h-96 bg-gray-500 rounded-lg" />}

          {!isLoading && <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-700">
            <div className="col-span-1">NAME</div>
            <div className="col-span-3">CUSTOM PROMPT</div>
            <div className="col-span-1">CREATED</div>
            <div className="col-span-1"></div>
          </div>}

          {/* Table Row */}
          {!isLoading && customPrompts?.map((item, index) => (
            <div className="grid grid-cols-6 gap-4 p-4" key={item.guid}>
              <div className="col-span-1">{item.name}</div>
              <div className="col-span-3">{item.custom_prompt}</div>
              <div className="col-span-1">{moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div className="col-span-1 flex flex-row gap-5">
                {
                  <>
                    <AiOutlineSetting
                      size={24}
                      onClick={() => setEditCustomPromptData(item)}
                      className='text-md cursor-pointer' />
                    <AiOutlineDelete
                      onClick={() => setDeleteCustomPromptData(item)}
                      size={24}
                      className='text-red-500 text-md cursor-pointer' />
                  </>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen || Boolean(editCustomPromptData)} setIsOpen={setIsOpen} title="Example Modal">
        <CreateCustomPrompt
          data={editCustomPromptData}
          setIsOpen={(isOpen, submit) => {
            setIsOpen(isOpen)
            setEditCustomPromptData(undefined)
            if (submit) {
              getCustomPrompt()
            }
          }} />
      </Modal>
      <Modal isOpen={Boolean(deleteCustomPromptData)} setIsOpen={() => setDeleteCustomPromptData(undefined)} title="Example Modal">
        <ModalDelete
          setIsOpen={() => setDeleteCustomPromptData(undefined)}
          handleDelete={(guid => {
            handleDeleteCustomPrompt(guid);
          })}
          guid={deleteCustomPromptData?.guid ?? ''}
          name={deleteCustomPromptData?.name ?? ''}
          />
      </Modal>
    </div>
  );
}
