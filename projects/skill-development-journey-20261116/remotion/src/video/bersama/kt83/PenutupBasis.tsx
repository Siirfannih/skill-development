import React from 'react';
import {DuniaIG, type IGProps} from '../../b6';

export const PenutupBasis: React.FC<IGProps> = (props) => <>
  <DuniaIG {...props}/>
  <style>{'[data-ig-narasi="T094"], [data-ig-narasi="T095"] { display: none; }'}</style>
</>;
