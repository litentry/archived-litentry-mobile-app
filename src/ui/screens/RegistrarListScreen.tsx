import React from 'react';
import RegistrarList from '@ui/components/RegistrarList';
import SafeView, {noTopEdges} from '@ui/components/SafeView';

function RegistrarListScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <RegistrarList />
    </SafeView>
  );
}

export default RegistrarListScreen;
