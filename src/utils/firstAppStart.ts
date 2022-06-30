import * as Storage from 'service/PersistedObjectStorage';

const HAS_APP_STARTED_ONCE = 'has_app_started_once';

function checkFirstAppStart() {
  const firstAppStart = !Storage.getItem(HAS_APP_STARTED_ONCE);

  if (firstAppStart) {
    Storage.setItem(HAS_APP_STARTED_ONCE, true);
  }

  return firstAppStart;
}

const isFirstAppStart = checkFirstAppStart();

export {isFirstAppStart};
