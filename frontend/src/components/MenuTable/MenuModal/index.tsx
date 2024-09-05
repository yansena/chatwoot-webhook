
import { fetchMenuById, } from "@/app/api/route";
import { Box, Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface MenuModalProps {
  id: number;
  open: boolean;
  setOpen: (open: any) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function MenuModal({ id, open, setOpen }: MenuModalProps) {
  const [menuData, setMenuData] = useState();

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["selectedMenu", id],
    queryFn: () => fetchMenuById(Number(id)),
  });

  // const mutation = useMutation({
  //   mutationFn: updateMenu,
  //   onSuccess: () => {
  //     onClose(); // Close modal after successful save
  //   },
  // });

  // Function to handle form submission
  // const handleSave = () => {
  //   mutation.mutate({ id: menuData.id, data: menuData });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...menuData.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setMenuData((prev) => ({ ...prev, options: updatedOptions }));
  };

  return (
    <Modal
      open={open}
      className="bg-slate-800 w-[60vw] h-[80vh] rounded-lg self-center justify-self-center shadow-xl transition-all ease-in-out text-white"
      onClose={() => setOpen((oldState: any) => !oldState)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box >
        <h1 className="text-2xl font-bold mt-10 ml-10">Detalhes do Menu:</h1>
        <div className="flex flex-col p-12">
          <div className="flex flex-row gap-4">
            <span className="text-lg">Menu titulo: </span>
            <input className="bg-transparent border border-1 rounded-md p-4 w-full border-white" value={data.content} />
          </div>
        </div>
      </Box> */}
      <Box sx={style}>
        <Typography variant="h6">Edit Menu</Typography>

        {menuData && (
          <div>
            <TextField
              label="Menu Name"
              name="name"
              value={menuData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Menu Content"
              name="content"
              value={menuData.content}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Typography variant="subtitle1" mt={2}>Options</Typography>
            <Divider />

            {menuData.options.map((option, index) => (
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
                  fullWidth
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

            <Button onClick={ } variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  )
}
export default MenuModal