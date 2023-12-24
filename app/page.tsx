'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { Loader } from '@/components/Loader';
import { Instructions } from '@/components/Instructions';
import Fuse from 'fuse.js';

interface FormData {
  inputValue: string;
}

const useTitleFilter = (data: any[], inputValue: string) => {
  const options = {
    keys: ['title'],
  };

  const fuse = new Fuse(data, options);

  return inputValue.trim() === '' ? data : fuse.search(inputValue).map((result) => result.item);
};

const HomePage: React.FC = () => {
  const { register, handleSubmit, setValue, watch, formState } = useForm<FormData>();
  const { errors } = formState;

  const [textValue, setTextValue] = useState('beatae');
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [customColorName, setCustomColorName] = useState('blue');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const inputWatchedValue = watch('inputValue', textValue);

  const handleCheckboxToggle = () => {
    setCheckboxValue(!checkboxValue);
  };

  const handleSetInputValue = () => {
    setTextValue('new value');
    setValue('inputValue', 'new value');
  };

  const onSubmit = (data: FormData) => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    setFilteredResults(useTitleFilter(results, inputWatchedValue));
  }, [results, inputWatchedValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2">
        <div className="flex flex-col gap-2 my-2 ml-1">
          <div>
            <code className="bg-cyan-400">customColorName</code> = "{customColorName}"
          </div>
          <div>
            <code className="bg-green-400">textValue</code> = "{textValue}"
          </div>
          <div>
            <code className="bg-purple-400">checkboxValue</code> = "{checkboxValue.toString()}"
          </div>
        </div>
        <div className="flex gap-3 my-3 items-center justify-center">
          <button type="button" onClick={() => setCustomColorName('green')} className="bg-slate-300 rounded-md p-1.5">
            set green
          </button>
          <button type="button" onClick={() => setCustomColorName('blue')} className="bg-slate-300 rounded-md p-1.5">
            set blue
          </button>
          <button onClick={handleSetInputValue} className="bg-slate-300 rounded-md p-1.5">
            set input value
          </button>
          <button onClick={handleCheckboxToggle} className="bg-slate-300 rounded-md p-1.5">
            <span className="bg-yellow-300">Toggle Checkbox</span>
          </button>
        </div>

        <Checkbox checked={checkboxValue} onChange={handleCheckboxToggle} color={customColorName}>
          Test
        </Checkbox>
        <Input
          id="inputValue"
          value={inputWatchedValue}
          onChange={(e) => {
            setTextValue(e.target.value);
            setValue('inputValue', e.target.value);
          }}
          color={customColorName}
        />

        <div className="flex flex-col gap-5 mb-3 justify-center">
          <div className="flex justify-center gap-2">
            <button type="submit" className="bg-slate-300 rounded-md p-1.5">
              <span className="bg-yellow-300">Submit</span>
            </button>
            {loading && <Loader />}
          </div>
          <div className="font-bold text-center">Results:</div>
          <div className="text-center">
            {filteredResults.map((result) => (
              <div key={result.id} className="bg-yellow-300">
                {result.title}
              </div>
            ))}
          </div>
        </div>

        <Instructions />
      </div>
    </form>
  );
};

export default HomePage;
