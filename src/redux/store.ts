import { configureStore } from '@reduxjs/toolkit'
import examStructureReducer from './features/examStructureSlice'
import examStructurePartReducer from './features/examStructurePartSlice'
import examStructurePartSubReducer from './features/examStructurePartSubSlice'

export const store = configureStore({
    reducer: {
        examStructure: examStructureReducer,
        examStructurePart: examStructurePartReducer,
        examStructurePartSub: examStructurePartSubReducer,
    }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store