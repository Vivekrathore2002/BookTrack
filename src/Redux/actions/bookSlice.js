import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// for api call
export const fetch_Bookdata = createAsyncThunk(
  '/books/FetechData',
  async () => {
    // const url = `https://fakestoreapi.com/products/category/${category}`;
    const url = `http://localhost:3000/api/v1/book`;
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    const data = await response.json();
    console.log('in slice');
    console.log(data.data.data);
    return data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    loadBooks: (state, action) => {
      // state.products = action.payload
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetch_Bookdata.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetch_Bookdata.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetch_Bookdata.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;

export const { loadBooks } = booksSlice.actions;
