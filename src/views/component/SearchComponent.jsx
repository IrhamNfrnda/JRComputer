import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const handleSearch = () => {
    console.log(searchQuery);
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      onSubmitEditing={handleSearch}
      value={searchQuery}
      style={{
        margin: 10,
        backgroundColor: '#64CCC5',
      }}
    />
  );
};

export default SearchComponent;