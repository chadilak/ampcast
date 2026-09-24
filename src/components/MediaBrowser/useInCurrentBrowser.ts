import useFirstValue from 'hooks/useFirstValue';
import useHistory from './useHistory';

export default function useInCurrentBrowser() {
    const {currentKey} = useHistory();
    const historyKey = useFirstValue(currentKey);

    return currentKey === historyKey;
}
