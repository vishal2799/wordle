import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export default StyleSheet.create({
  map: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: colors.darkgrey,
    margin: 3,
    maxWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 28,
  },
});
