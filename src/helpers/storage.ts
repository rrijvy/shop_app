const StorageKey = {
  ShowCartPopover: "showCartPopover",
};

class StorageImpl {
  private getDataFromLS(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  private setDataToLS(key: string, data?: string): void {
    if (!data) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, data);
    }
  }

  get ShowCartPopover(): boolean | null {
    return Boolean(this.getDataFromLS(StorageKey.ShowCartPopover));
  }

  set ShowCartPopover(token: boolean | null) {
    this.setDataToLS(StorageKey.ShowCartPopover, String(token));
  }
}

const Storage = new StorageImpl();
export default Storage;
