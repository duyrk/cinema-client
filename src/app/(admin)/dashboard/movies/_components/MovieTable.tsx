import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, ScrollArea, Box} from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { format } from 'date-fns';

import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';
import { MovieService } from '@services/MovieService';
  interface Row {
    movieId: number;
    movieName: string;
    description: string;
    movieGenre: string;
    duration: string;
    director: string;
    actor: string;
    releaseDate: string;
    endDate: string;
    ageRestriction: string;
    urlTrailer: string;
    status: number;
    urlThumbnail: string;
  }
    // Các trường khác

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();
    const [isUpdate, setUpdate] = useState(false);
    const [movies, setMovies] = useState<IMovieResponse>();
    useEffect(() => {
      fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
        const moviesResponse = await MovieService.getAllMovie();
        setMovies(moviesResponse.data);
    } catch (error) {
        console.error("There is error when fetching data", error);
    }
};

const updateMovie = async (movieId: string, body: IMovieRequest) => {
  try {
    const response =await MovieService.updateMovie(movieId, body);
    console.log('Movie updated successfully:', response);
    fetchMovies();
  } catch (error) {
    console.error('Failed to update movie:', error);
  }
}
const deleteMovie = async (movieId: string) => {
  try {
    const response = await MovieService.deleteMovie(movieId);
    console.log('Movie deleted successfully:', response);
    fetchMovies();
  } catch (error) {
    console.error('Failed to delete movie:', error);
  }
}

const handleSubmitChange = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định
    const releaseDate = form.values.releaseDate;
    const formattedReleaseDate = format(releaseDate, 'yyyy-MM-dd HH:mm:ss');
    const endDateStr = form.values.endDate; 
    const formattedEndDate = format(endDateStr, 'yyyy-MM-dd HH:mm:ss');
    const formData = {
      movieName: form.values.name,
      movieGenre: form.values.genre,
      description: form.values.description,
      duration: form.values.duration,
      director: form.values.director,
      actor: form.values.actor,
      releaseDate: formattedReleaseDate,
      endDate: formattedEndDate,
      ageRestriction: form.values.ageRestriction,
      urlTrailer: form.values.trailer,
      status: form.values.status,
      urlThumbnail: form.values.thumbnail
    };
    form.reset();
    updateMovie(form.values.id.toString(), formData);
};

const handleSubmit = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định

  try {
    const releaseDate = form.values.releaseDate;
    const formattedReleaseDate = format(releaseDate, 'yyyy-MM-dd HH:mm:ss');

    const endDateStr = form.values.endDate;
    const formattedEndDate = format(endDateStr, 'yyyy-MM-dd HH:mm:ss');
    // Lấy giá trị từ các trường nhập liệu trong form
    const formData = {
      movieName: form.values.name,
      movieGenre: form.values.genre,
      description: form.values.description,
      duration: form.values.duration,
      director: form.values.director,
      actor: form.values.actor,
      releaseDate: formattedReleaseDate,
      endDate: formattedEndDate,
      ageRestriction: form.values.ageRestriction,
      urlTrailer: form.values.trailer,
      status: form.values.status,
      urlThumbnail: form.values.thumbnail
    };

    // Gọi API POST để tạo mới dữ liệu
    const response = await MovieService.addMovie(formData);

    // Xử lý kết quả trả về từ API, ví dụ hiển thị thông báo thành công
    console.log('Movie created successfully:', response);
    // Thực hiện các hành động tiếp theo sau khi tạo thành công (nếu cần)

    // Đặt lại form sau khi gửi thành công (nếu cần)
    form.reset();
    fetchMovies();
  } catch (error) {
    // Xử lý lỗi khi gọi API, ví dụ hiển thị thông báo lỗi
    console.error('Error creating movie:', error);
    // Thực hiện các hành động xử lý lỗi (nếu cần)
  }
};

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {id: 0, name: '', description: '',genre: '', duration: '', director: '', actor: '', releaseDate: '', endDate: '', ageRestriction: '', trailer: '', status: 0, thumbnail: ''},
      validate: {
        name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        description: (value) => (value.length < 2 ? 'Description must have at least 2 letters' : null),
        genre: (value) => (value.length < 2 ? 'Gernre must have at least 2 letters' : null),
        duration: (value) => (value.length < 2 ? 'Duration must have at least 2 letters' : null),
        director: (value) => (value.length < 2 ? 'Director must have at least 2 letters' : null),
        actor: (value) => (value.length < 2 ? 'Actor must have at least 2 letters' : null),
        ageRestriction: (value) => (value.length < 2 ? 'Age Restriction must have at least 2 letters' : null),
        trailer: (value) => (value.length < 2 ? 'Trailer must have at least 2 letters' : null),
        thumbnail: (value) => (value.length < 2 ? 'Thumbnail must have at least 2 letters' : null),
        releaseDate: (value) => {
            if (!value) return 'Release Date is required';
            const selectedDate = new Date(value);
            const today = new Date();
            if (selectedDate < today) {
              return 'Release Date must be after or today';
            }
            return null; 
          },
      
          endDate: (value, values) => {
            if (!value) return 'End Date is required';
            if (!values.releaseDate) return 'Please select Release Date first';
            const selectedEndDate = new Date(value);
            const selectedReleaseDate = new Date(values.releaseDate);
            if (selectedEndDate <= selectedReleaseDate) {
              return 'End Date must be after Release Date';
            }
            return null; 
          },

          status: (value) => {
            if (value !== 0 && value !== 1) {
              return 'Status must be either 0 or 1';
            }
            return null; 
          },
      },
    });
    const handleReset = () => {
        setUpdate(false);

        form.reset();
      };
      const handleDeleteMoveClick = (movieId: number) => {
        deleteMovie(movieId.toString());
      };
      const handleTableRowClick = (row: Row) => {
        setUpdate(true);
        const releaseDate = new Date(row.releaseDate);
        const endDate = new Date(row.endDate);
        form.setValues({
          id: row.movieId,
          name: row.movieName,
          description: row.description,
          genre: row.movieGenre,
          duration: row.duration,
          director: row.director,
          actor: row.actor,
          releaseDate: releaseDate, // Chuyển đổi sang kiểu Date
          endDate: endDate, // Chuyển đổi sang kiểu Date
          ageRestriction: row.ageRestriction,
          trailer: row.urlTrailer,
          status: row.status,
          thumbnail: row.urlThumbnail
        })

      };

    const rows = movies?.data.map((row) => (
        <Table.Tr key={row.movieId}>
        <Table.Td>{row.movieId}</Table.Td>
        <Table.Td>{row.movieName}</Table.Td>
        <Table.Td>{row.description}</Table.Td>
        <Table.Td>{row.movieGenre}</Table.Td>
        <Table.Td>{row.duration}</Table.Td>
        <Table.Td>{row.director}</Table.Td>
        <Table.Td>{row.actor}</Table.Td>
        <Table.Td>{row.releaseDate}</Table.Td>
        <Table.Td>{row.endDate}</Table.Td>
        <Table.Td>{row.ageRestriction}</Table.Td>
        <Table.Td>{row.urlTrailer}</Table.Td>
        <Table.Td>{row.status}</Table.Td>
        <Table.Td>{row.urlThumbnail}</Table.Td>
        <Table.Td><Menu
        transitionProps={{ transition: 'pop-top-right' }}
        position="top-end"
        width={220}
        withinPortal
      > 
        <Menu.Target>
          <Button
            rightSection={
              <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            }
            pr={12}
          >
            Action
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconHttpPut
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              </Text>
            }
            onClick={() => handleTableRowClick(row)}
          >
            Update
          </Menu.Item >
          <Menu.Item
            leftSection={
              <IconHttpDelete
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.pink[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              </Text>
            }
            onClick={() => handleDeleteMoveClick(row.movieId)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      </Table.Td>
      </Table.Tr>
    ));
  
    return (
      <Box>
      <ScrollArea miw={300} h={350} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th miw={150}>Name</Table.Th>
              <Table.Th miw={300}>Description</Table.Th>
              <Table.Th>Genre</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Director</Table.Th>
              <Table.Th miw={150}>Actor</Table.Th>
              <Table.Th miw={120}>RelaseDate</Table.Th>
              <Table.Th miw={120}>EndDate</Table.Th>
              <Table.Th>AgeRestriction</Table.Th>
              <Table.Th>Trailer</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th miw={150}>Thumbnail</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

        <ScrollArea style={{ 
            justifyContent: 'center',
            alignItems: 'center',}
    } miw={200} h={350} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <form  onSubmit={form.onSubmit(isUpdate ? handleSubmitChange : handleSubmit)}>
            <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly {...form.getInputProps('id')} />
        <TextInput ml="sm" mt="sm" label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Description" placeholder="Description" {...form.getInputProps('description')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Genre" placeholder="Genre" {...form.getInputProps('genre')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Duration" placeholder="Duration" {...form.getInputProps('duration')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Director" placeholder="Director" {...form.getInputProps('director')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Actor" placeholder="Actor" {...form.getInputProps('actor')} />
        <DateTimePicker withSeconds ml="sm" mt="sm" mr ="lg" label="ReleaseDate" placeholder="Pick date and time" {...form.getInputProps('releaseDate')} />
        <DateTimePicker withSeconds ml="sm" mt="sm" mr ="lg" label="EndDate" placeholder="Pick date and time" {...form.getInputProps('endDate')}/>
        <TextInput ml="sm" mt="sm" mr ="lg" label="AgeRestriction" placeholder="AgeRestriction" {...form.getInputProps('ageRestriction')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Trailer" placeholder="Trailer" {...form.getInputProps('trailer')} />
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="Status"
          placeholder="Status"
          min={0}
          max={1}
          {...form.getInputProps('status')}
        />
        <TextInput ml="sm" mt="sm" mr="lg" label="Thumbnail" placeholder="Thumbnail" {...form.getInputProps('thumbnail')} />
        
        <Button color={isUpdate ? 'yellow' : 'cyan'} ml="sm" mt="lg" mb="lg" type="submit">
        {isUpdate ? 'Update' : 'Create'}
        </Button>
        <Button color='blue' ml="sm" mt="lg" mb="lg" type="reset" onClick={handleReset}>
          Reset
        </Button>
        </form>
        </ScrollArea>
      </Box>
    );
  }