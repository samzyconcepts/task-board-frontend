<template>
  <div class="fixed inset-0 transition-opacity duration-300 ease-in-out bg-black/50">
    <aside
      class="fixed top-0 right-0 h-screen w-[630px] p-3 bg-transparent transform transition-transform duration-300 ease-in-out"
    >
      <div class="flex flex-col h-full bg-white rounded-lg">
        <form class="h-full">
          <div class="relative flex flex-col items-center justify-start w-full h-full p-5">
            <div class="flex justify-between w-full mb-4">
              <h4 class="text-xl font-semibold">Task details</h4>
              <button class="p-2 border border-gray-300 rounded-lg cursor-pointer">
                <img
                  src="../assets/close_ring_duotone-1.svg"
                  alt="close nav"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label class="text-sm text-gray-400" htmlFor="taskname">Task name</label>
              <input
                id="taskname"
                name="taskName"
                type="text"
                placeholder="Task name"
                class="p-2 text-lg border border-gray-300 rounded-lg focus:outline-2 focus:outline-blue-500 focus:border-none"
                autoFocus
              />
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label class="text-sm text-gray-400" htmlFor="taskDescription">Description</label>
              <textarea
                name="taskDescription"
                placeholder="Enter a short description"
                class="w-full h-40 p-2 text-gray-500 align-top border border-gray-300 rounded-md text-start"
                maxLength="{400}"
              />
            </div>
            <div class="w-full my-3">
              <p class="mb-2 text-sm text-gray-400">Icon</p>
              <div class="flex w-full gap-3">
                <div class="flex items-center p-2 bg-gray-200 rounded-lg">
                  <button class="cursor-pointer" data-icon="/worker.svg">
                    <img src="../assets/laptop.png" alt="clock" width="30" height="30" />
                  </button>
                </div>
                <div class="flex items-center p-2 bg-gray-200 rounded-lg">
                  <button class="cursor-pointer" data-icon="/dialogue.svg">
                    <img src="../assets/comment.png" alt="clock" width="30" height="30" />
                  </button>
                </div>
                <div class="flex items-center p-2 bg-gray-200 rounded-lg">
                  <button class="cursor-pointer" data-icon="/cofee.svg">
                    <img src="../assets/teacup.png" alt="clock" width="25" height="25" />
                  </button>
                </div>
                <div class="flex items-center p-2 bg-gray-200 rounded-lg">
                  <button class="cursor-pointer" data-icon="/gym.svg">
                    <img src="../assets/dumbbell.png" alt="clock" width="25" height="25" />
                  </button>
                </div>
                <div class="flex items-center p-2 bg-gray-200 rounded-lg">
                  <button class="cursor-pointer" data-icon="/books.svg">
                    <img src="../assets/book.png" alt="clock" width="25" height="25" />
                  </button>
                </div>
                <div class="flex items-center p-2 bg-gray-200 rounded-lg">
                  <button class="cursor-pointer" data-icon="/clock.svg">
                    <img src="../assets/clock.png" alt="clock" width="25" height="25" />
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col w-full mb-3">
              <p class="mb-2 text-sm text-gray-400">Status</p>
              <div class="flex flex-wrap gap-3">
                <label
                  class="w-[260px] cursor-pointer flex rounded-xl p-[2px] border border-gray-300 items-center gap-2 relative transition-colors duration-300"
                >
                  <div class="p-2 bg-amber-400/80 rounded-xl">
                    <img
                      src="../assets/Time_atack_duotone.svg"
                      alt="icon wait"
                      width="{25}"
                      height="{25}"
                    />
                  </div>
                  <input
                    id="status-wait"
                    name="status"
                    type="radio"
                    value="inProgress"
                    class="absolute radio-input top-4 right-5"
                  />
                  <label htmlFor="status-wait" class="cursor-pointer radio-label"
                    >In Progress</label
                  >
                </label>

                <label
                  class="w-[260px] cursor-pointer flex rounded-xl p-[2px] border border-gray-300 items-center gap-2 relative transition-colors duration-300"
                >
                  <div class="p-2 bg-green-400/80 rounded-xl">
                    <img
                      src="../assets/Done_round_duotone.svg"
                      alt="icon done"
                      width="{25}"
                      height="{25}"
                    />
                  </div>
                  <input
                    id="status-done"
                    name="status"
                    type="radio"
                    value="completed"
                    class="absolute radio-input top-4 right-5"
                  />
                  <label htmlFor="status-done" class="cursor-pointer radio-label">
                    Completed
                  </label>
                </label>

                <label
                  class="w-[260px] cursor-pointer flex rounded-xl p-[2px] border border-gray-300 items-center gap-2 relative transition-colors duration-300"
                >
                  <div class="p-2 bg-red-500 rounded-xl">
                    <img
                      src="../assets/close_ring_duotone-1.svg"
                      alt="icon done"
                      width="{25}"
                      height="{25}"
                    />
                  </div>
                  <input
                    id="status-dont"
                    name="status"
                    type="radio"
                    value="dontDo"
                    class="absolute radio-input top-5 right-5"
                  />
                  <label htmlFor="status-dont" className="radio-label cursor-pointer"
                    >Won&apos;t do</label
                  >
                </label>
              </div>
            </div>

            <footer class="flex items-end justify-end w-full h-full gap-5 text-white">
              <button
                class="flex items-center gap-3 py-1 px-5 bg-[#3662E3] border-none rounded-2xl not-disabled:cursor-pointer disabled:bg-gray-300 cursor-default"
              >
                Delete
                <img src="../assets/Trash.svg" alt="Trash Icon" width="15" height="15" />
              </button>
              <button
                class="flex items-center gap-3 py-1 px-5 bg-[#3662E3] border-none rounded-2xl cursor-pointer"
              >
                Save
                <img
                  src="../assets/Done_round.svg"
                  alt="Trash Icon"
                  width="15"
                  height="15"
                  class="pt-1"
                />
              </button>
            </footer>
          </div>
        </form>
      </div>
    </aside>
  </div>
</template>

<!-- fixed inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'

fixed top-0 right-0 h-screen w-[630px] p-3 bg-transparent transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : 'translate-x-full'


Status
{`w-[260px]  cursor-pointer flex rounded-xl p-[2px]  border border-gray-300  items-center gap-2 relative cursor-pointer transition-colors duration-300 ${status === 'inProgress' || existingData.taskStatus === 'inProgress' ? 'border-[#3662E3] ring-2 ring-[#3662E3]' : ''}`}

checked={status === 'inProgress' || existingData.taskStatus === 'inProgress'}
                                            onChange={handleChange}
-->
