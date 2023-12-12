import React, { useCallback, useEffect, useState } from 'react';
import Page from '../components/Page';
import Button from '../components/Button';
import { getFeelings, setFeelings } from '../cloudStorage';

export default function Login(): JSX.Element {
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [files, setFiles] = useState<Array<any>>([]);

  const roundTrip = useCallback(async () => {
    await setFeelings([{
      ts: new Date(),
      model: 'gloria',
      path: ['works'],
    }]);

    console.log(await getFeelings());
  }, []);

  return (
    <Page>
      <Button onClick={roundTrip}>
        Login
      </Button>
      <ol>
        {
          files.map((f) => (
            <li key={f.id}>
              {f.name} {f.id}
            </li>
          ))
        }
      </ol>
    </Page>
  );
}