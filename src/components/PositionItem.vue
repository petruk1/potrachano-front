<template>
    <div class="dynamic-combobox">
        <div class="input-container">
            <input type="text"
                   v-model="usersInput"
                   @blur="handleBlur($event)"
                   @focus="handleFocus()">
        </div>
        <ul class="items-container"
            v-if="isListVisible">
            <li class="item"
                v-for="(item, key) of items"
                :key="key"
                v-on:click="makeSelect(item)">{{item.value}}
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: 'DynamicCombobox',
        props: {
            items: {type: Array, default: () => [{key: 1, value: 'One'}, {key: 2, value: 'Two'}]}
        },
        data: () => {
            return {
                selectedItem: null,
                usersInput: '2',
                isListVisible: false
            }
        },
        methods: {
            makeSelect(item) {
                this.selectedItem = item;
                this.usersInput = item.value;
                this.isListVisible = false;
            },
            // onChangeItem: () => this.selectedItem = null,
            handleBlur(e) {
                console.log(e);
                setTimeout(() => this.isListVisible = false, 40);
            },
            handleFocus() {
                this.isListVisible = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .dynamic-combobox {
        input {
            padding: 5px;
            border: navajowhite;
            outline: none;
            font-size: 1.1em;
            border-radius: 3px;
            box-shadow: 0 0 4px 1px lightgrey;
        }

        .items-container {
            margin: 0;
            padding: 0;
            background-color: white;
            list-style: none;

            .item {
                padding: 5px;

                &:hover {
                    background-color: aliceblue;
                }
            }

        }
    }
</style>

