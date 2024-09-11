import { MenuContext } from "@/context/MenuContext";
import { MenuProps } from "@/types";
import { Box, Button, Divider, Skeleton, TextField, Typography, Modal, Select, MenuItem } from "@mui/material";
import { Close } from '@mui/icons-material';
// import { Dialog, Field, Fieldset, Input, Label, Legend, Select, Textarea, Transition } from '@headlessui/react'
import { useContext, useEffect, useState } from "react";
import { Formik, Form, FieldArray, useFormik } from 'formik';

interface MenuModalProps {
  id: number;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: any) => void;
  isEditing: boolean;
}

function MenuModal({ open, setOpen, isEditing = false }: MenuModalProps) {
  const [menuData, setMenuData] = useState<MenuProps>({
    name: '',
    content: '',
    options: [],
    type: 'input_select'
  });
  const { state } = useContext(MenuContext);

  console.log({ menuData });

  const handleSubmit = (values: MenuProps) => {
    if (isEditing) {
      // Call mutation to update the menu
      console.log("Updating Menu: ", values);
    } else {
      // Call mutation to create a new menu
      console.log("Creating New Menu: ", values);
    }
  };

  const handleOptionChange = (index: number, field: any, value: any) => {
    const updatedOptions = [...menuData.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setMenuData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleCloseModal = (resetForm: any) => {
    resetForm();

    setMenuData({
      name: '',
      content: '',
      options: [],
      type: 'input_select'
    });
    setOpen((oldState: boolean) => !oldState);
  }

  useEffect(() => {
    if (isEditing && state.selectedMenu.name) {
      console.log('CAIU AQUIIII')
      setMenuData(state.selectedMenu)
    }
  }, [state.selectedMenu, isEditing]);


  if (state.loading) {
    return (
      <Modal
        open={open}
        className="w-[60vw] self-center justify-self-center overflow-y-auto rounded-lg bg-background text-white shadow-xl transition-all ease-in-out backdrop:bg-gray-700 backdrop:blur-lg"
        hideBackdrop
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box className={"p-6"}>
          <div className="flex w-full flex-row justify-between">
            <Typography variant="h6" className="mb-4 font-bold text-gray-900">Edit Menu</Typography>
            <button onClick={handleCloseModal}>
              <Close className="text-black" />
            </button>
          </div>
          <div className="flex flex-col gap-4 ">
            <Skeleton variant="rectangular" width={210} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
          </div>
        </Box>
      </Modal>
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

        <Formik initialValues={menuData} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            resetForm
            // isSubmitting,
            /* and other goodies */
          }) => (

            <Form onSubmit={handleSubmit}>
              <div className="flex w-full flex-row justify-between">
                <Typography variant="h6" className="mb-4 font-bold text-gray-900">Edit Menu</Typography>
                <button onClick={() => handleCloseModal(resetForm)}>
                  <Close className="text-black" />
                </button>
              </div>
              <Divider />
              {
                state.selectedMenu && (
                  <div className=" overflow-auto">
                    <TextField
                      name="name"
                      label="Nome do Menu"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    {errors.name}

                    <TextField
                      label="Descrição"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    {errors.content}

                    <Typography variant="subtitle1" className="mt-2 font-medium text-gray-800">Opções de Respostas</Typography>
                    <Divider />

                    <FieldArray name="options">
                      {({ push, remove }) => (
                        <div>
                          {values.options.map((option, index) => (
                            <div key={option.id} className="mt-8">

                              <div className="flex flex-row items-center justify-between gap-4">
                                <div className="flex flex-row items-center gap-4">
                                  <TextField
                                    label="Option Title"

                                    name={`title_${index}`}
                                    value={option.title}
                                    onChange={(e) => handleOptionChange(index, 'title', e.target.value)}

                                  />

                                  <Select
                                    labelId="response-type-select-label"
                                    id="respose-type-select"
                                    name="responseType"
                                    value={option.menuResponse.responseType}
                                    label="Tipo da Resposta"
                                    className="w-24"
                                    onChange={(e) => handleOptionChange(index, 'responseType', {
                                      responseType: e.target.value,
                                    })}
                                  >
                                    <MenuItem value={"article"}>Link</MenuItem>
                                    <MenuItem value={"text"}>Texto</MenuItem>
                                  </Select>
                                </div>
                                <div>
                                  <button onClick={() => remove(index)}
                                    className="rounded-xl border border-gray-300 p-1 text-gray-500 hover:bg-gray-400 hover:text-white">
                                    <Close />
                                  </button>
                                </div>
                              </div>
                              {
                                option.menuResponse.responseType === 'article' ? (
                                  <div >
                                    <TextField
                                      label="Titulo"
                                      name={`options[${index}].menuResponse.content.items[0].title`}
                                      value={option.menuResponse.content.items?.[0]?.title || ''}
                                      onChange={(e) =>
                                        handleOptionChange(index, 'menuResponse', {
                                          content: {
                                            items: [
                                              {
                                                title: e.target.value,
                                              },
                                            ],
                                          },
                                        })
                                      }
                                      fullWidth
                                      margin="normal"
                                    />

                                    <TextField
                                      label="Link URL"
                                      name={`linkUrl_${index}`}
                                      value={(option.menuResponse.content as any)?.items?.[0]?.link || ''}
                                      onChange={(e) =>
                                        handleOptionChange(index, 'menuResponse', {
                                          content: {
                                            items: [
                                              { link: e.target.value }
                                            ]
                                          }
                                        })
                                      }
                                      fullWidth
                                    />

                                    <TextField
                                      label="Link Description"
                                      name={`linkDescription_${index}`}
                                      value={(option.menuResponse.content as any)?.items?.[0]?.description || ''}
                                      onChange={(e) =>
                                        handleOptionChange(index, 'menuResponse', {
                                          content: {
                                            items: [
                                              { description: e.target.value }
                                            ]
                                          }
                                        })
                                      }
                                      fullWidth
                                      margin="normal"
                                    />
                                  </div>
                                ) : (

                                  <TextField
                                    label="Menu Response Content"
                                    name={`menuResponseContent_${index}`}
                                    value={option.menuResponse.content || ''}
                                    onChange={(e) =>
                                      handleOptionChange(index, 'menuResponse', {
                                        ...option.menuResponse,
                                        content: e.target.value,
                                      })
                                    }
                                    fullWidth
                                    margin="normal"
                                  />

                                )
                              }
                              <Divider />
                            </div>

                          ))}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => push({ title: '', value: '', menuResponse: { content: '' } })}
                            className="mt-4"
                          >
                            Adicionar Nova Opcao
                          </Button>
                        </div>
                      )}
                    </FieldArray>

                    <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
                      Save Changes
                    </Button>
                  </div>
                )
              }
            </Form>
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