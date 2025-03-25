import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.util.Log

class AsyncStorageHelper(context: Context) : SQLiteOpenHelper(
    context,
    "/data/data/${context.packageName}/databases/RKStorage",
    null,
    1
) {
    override fun onCreate(db: SQLiteDatabase) {}
    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {}

    fun getAsyncStorageValue(key: String): String? {
        val db = readableDatabase
        var value: String? = null

        try {
            val cursor = db.query(
                "catalystLocalStorage",
                arrayOf("value"),
                "key = ?",
                arrayOf(key),
                null, null, null
            )

            if (cursor.moveToFirst()) {
                value = cursor.getString(0)
            }
            cursor.close()
        } catch (e: Exception) {
            Log.e("AsyncStorage", "Error reading from RKStorage", e)
        } finally {
            db.close()
        }

        return value
    }
}