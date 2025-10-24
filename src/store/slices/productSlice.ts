import { Product } from "@/types/product";
import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await axiosInstance.get("/products");
    return res.data.data;
  }
);

export const addProduct = createAsyncThunk<Product, FormData>(
  "products/addProduct",
  async (formData) => {
    const res = await axiosInstance.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; formData: FormData }
>("products/updateProduct", async ({ id, formData }) => {
  const res = await axiosInstance.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
});

export const deleteProduct = createAsyncThunk<number, number>(
  "products/deleteProduct",
  async (id) => {
    await axiosInstance.delete(`/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const idx = state.products.findIndex(
            (p) => p.id === action.payload.id
          );
          if (idx !== -1) state.products[idx] = action.payload;
        }
      )
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
        }
      );
  },
});

export default productSlice.reducer;
