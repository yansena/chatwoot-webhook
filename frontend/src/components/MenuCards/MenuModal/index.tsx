import { MenuContext } from "@/context/MenuContext";
import { MenuProps } from "@/types";
import { Box, Button, Divider, Skeleton, TextField, Typography, Modal } from "@mui/material";
import { Close } from '@mui/icons-material';
// import { Dialog, Field, Fieldset, Input, Label, Legend, Select, Textarea, Transition } from '@headlessui/react'
import { useContext, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, FieldArray, Field, useFormikContext } from 'formik';

interface MenuModalProps {
  id: number;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: any) => void;
}

function MenuModal({ open, setOpen }: MenuModalProps) {
  const [menuData, setMenuData] = useState<MenuProps>({} as MenuProps);
  const { state } = useContext(MenuContext)


  const handleSubmit = () => {
    // mutation.mutate({ ...menuData });
  };

  // const handleChange = (e: any) => {
  //   console.log(e.target);
  //   const { name, value } = e.target;
  //   setMenuData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleOptionChange = (index: number, field: any, value: any) => {
    const updatedOptions = [...menuData.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setMenuData((prev) => ({ ...prev, options: updatedOptions }));
  };

  useEffect(() => {
    if (state.selectedMenu.name) {
      setMenuData(state.selectedMenu)
    }
  }, [state.selectedMenu]);


  if (state.loading) {
    return (
      <div className="flex flex-col items-center justify-center p-32">
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rectangular" width={210} height={60} />
      </div>
    )
  }

  return (
    // <Transition appear show={open} as={Fragment}>
    <Modal
      open={open}
      className="h-[80vh] max-h-[80vh] w-[60vw] self-center justify-self-center overflow-y-auto rounded-lg bg-background text-white shadow-xl transition-all ease-in-out backdrop:bg-gray-700 backdrop:blur-lg"
      hideBackdrop
      onClose={() => setOpen((oldState: any) => !oldState)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box className={"p-6"}>
        <div className="flex w-full flex-row justify-between">
          <Typography variant="h6" className="mb-4 font-bold text-gray-900">Edit Menu</Typography>
          <button onClick={() => setOpen((oldState: any) => !oldState)}>
            <Close className="text-black" />
          </button>
        </div>
        <Formik initialValues={menuData} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <>
              {
                state.selectedMenu && (
                  <div className=" overflow-auto">
                    {/* <Fieldset className="space-y-8">
            <Field>
              <Label className="text-black">Menu Name</Label>
              <Input
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-black"
                name="name" value={menuData.name} onChange={handleChange} />
            </Field>
          </Fieldset> */}
                    <TextField
                      name="name"
                      label="Nome Menu"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    {errors.name}

                    <TextField
                      label="Menu Content"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    {errors.content}

                    <Typography variant="subtitle1" className="text-gray-800">Options</Typography>
                    <Divider />

                    {state.selectedMenu.options && state.selectedMenu.options.map((option, index) => (
                      <div key={option.id} className="mt-2">
                        <TextField
                          label="Option Title"
                          name={`title_${index}`}
                          value={option.title}
                          onChange={(e) => handleOptionChange(index, 'title', e.target.value)}
                          fullWidth
                          margin="normal"
                        />

                        <TextField
                          label="Option Value"
                          name={`value_${index}`}
                          value={option.value}
                          onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                          margin="normal"
                        />

                        <TextField
                          label="Option Type"
                          name={`value_${index}`}
                          value={option.menuResponse.responseType}
                          onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                          margin="normal"
                        />

                        <TextField
                          label="Menu Response Content"
                          name={`menuResponseContent_${index}`}
                          value={option.menuResponse.content}
                          onChange={(e) =>
                            handleOptionChange(index, 'menuResponse', {
                              ...option.menuResponse,
                              content: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                        />
                      </div>
                    ))}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Save Changes
                    </Button>
                  </div>
                )
              }
            </>
          )}

        </Formik>
      </Box>
      {/* <Fieldset className="space-y-8">
        <Legend className="text-lg font-bold">Shipping details</Legend>
        <Field>
          <Label className="block">Street address</Label>
          <Input className="mt-1 block" name="address" />
        </Field>
        <Field>
          <Label className="block">Country</Label>
          <Select className="mt-1 block" name="country">
            <option>Canada</option>
            <option>Mexico</option>
            <option>United States</option>
          </Select>
        </Field>
        <Field>
          <Label className="block">Delivery notes</Label>
          <Textarea className="mt-1 block" name="notes" />
        </Field>
      </Fieldset> */}
    </Modal>
    // </Transition>
  )
}
export default MenuModal