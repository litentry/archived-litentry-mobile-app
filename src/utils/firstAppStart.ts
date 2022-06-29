import * as Storage from 'service/PersistedObjectStorage';

const IS_APP_STARTED_ONCE = 'is_app_started_once';

function checkFirstAppStart() {
  const firstAppStart = !Storage.getItem(IS_APP_STARTED_ONCE);

  if (firstAppStart) {
    Storage.setItem(IS_APP_STARTED_ONCE, true);
  }

  return firstAppStart;
}

const isFirstAppStart = checkFirstAppStart();

export {isFirstAppStart};
